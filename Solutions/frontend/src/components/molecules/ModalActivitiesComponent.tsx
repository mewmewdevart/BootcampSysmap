import { SetStateAction, useState, useEffect } from "react";
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ButtonComponent from "@atoms/ButtonComponent";
import InputFieldComponent from "@atoms/InputFieldComponent";
import { Image } from "lucide-react";
import CardUserComponent from "./CardUserComponent";
import { useActivities } from "@/context/activitiesContext";
import MapPicker from "@atoms/MapPickerComponent";
import ToastNotifications from "@atoms/ToastNotifications";
import { MESSAGES } from "@/constants/messages";

interface ActivityType {
  id: string;
  name: string;
  image: string;
}

interface Activity {
  id: string;
  name: string;
  description: string;
  date: string;
  private: boolean;
  type: string;
  image: string;
  address?: {
    latitude: number;
    longitude: number;
  };
}

function ModalActivitiesComponent({
  setIsOpen,
  activityToEdit,
}: {
  setIsOpen: (isOpen: boolean) => void;
  activityToEdit?: Activity | null;
}) {
  const { activityTypes, addActivity, updateActivity } = useActivities();

  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [privateActivity, setPrivateActivity] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{
    title: string;
    description?: string;
    variant: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (activityToEdit) {
      setTitle(activityToEdit.name || "");
      setDescription(activityToEdit.description || "");
      setScheduledDate(activityToEdit.date || "");
      setPrivateActivity(activityToEdit.private || false);
      setSelectedTypeId(activityToEdit.type || "");
      setImagePreview(activityToEdit.image || null);
      if (activityToEdit.address) {
        setLatitude(activityToEdit.address.latitude || null);
        setLongitude(activityToEdit.address.longitude || null);
      }
    }
  }, [activityToEdit]);
  

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    if (!title) newErrors.title = MESSAGES.VALIDATIONS.REQUIRED_TITLE;
    if (!description)
      newErrors.description = MESSAGES.VALIDATIONS.REQUIRED_DESCRIPTION;
    if (!scheduledDate)
      newErrors.scheduledDate = MESSAGES.VALIDATIONS.REQUIRED_DATE;
    if (!imageFile && !imagePreview)
      newErrors.imageFile = MESSAGES.VALIDATIONS.REQUIRED_IMAGE;
    if (!selectedTypeId)
      newErrors.typeId = MESSAGES.VALIDATIONS.REQUIRED_TYPE;
    if (latitude === null || longitude === null)
      newErrors.location = MESSAGES.VALIDATIONS.REQUIRED_LOCATION;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveActivity = async () => {
    if (!validateFields()) {
      setToast({
        title: MESSAGES.ERRORS.ACTIVITY_CREATION,
        description: "Preencha todos os campos obrigatórios.",
        variant: "error",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("typeId", selectedTypeId!);
      formData.append("scheduledDate", new Date(scheduledDate).toISOString());
      formData.append("private", String(privateActivity));
      formData.append("address", JSON.stringify({ latitude, longitude }));
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (activityToEdit) {
        await updateActivity(activityToEdit.id, formData, localStorage.getItem("token") || "");
        setToast({
          title: MESSAGES.SUCCESS.ACTIVITY_UPDATED,
          description: MESSAGES.SUCCESS.ACTIVITY_UPDATED_DESCRIPTION,
          variant: "success",
        });
      } else {
        await addActivity({
          title,
          description,
          typeId: selectedTypeId!,
          scheduledDate: new Date(scheduledDate).toISOString(),
          private: privateActivity,
          address: { latitude: latitude!, longitude: longitude! },
          image: imageFile!,
        });
        setToast({
          title: MESSAGES.SUCCESS.ACTIVITY_CREATED,
          description: MESSAGES.SUCCESS.ACTIVITY_CREATED_DESCRIPTION,
          variant: "success",
        });
      }

      setTimeout(() => setIsOpen(false), 100);

      setTitle("");
      setDescription("");
      setScheduledDate("");
      setPrivateActivity(false);
      setImageFile(null);
      setImagePreview(null);
      setLatitude(null);
      setLongitude(null);
      setSelectedTypeId(null);
      setErrors({});
    } catch (error) {
      console.error("Erro ao salvar atividade:", error);

      setToast({
        title: MESSAGES.ERRORS.ACTIVITY_CREATION,
        description: MESSAGES.ERRORS.ACTIVITY_CREATION_DESCRIPTION,
        variant: "error",
      });

      setTimeout(() => setIsOpen(false), 100);
    }
  };

  const handleSelectType = (categoryId: string) => {
    setSelectedTypeId(categoryId);
    setErrors((prev) => ({ ...prev, typeId: "" }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, imageFile: "" }));
    }
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
    setErrors((prev) => ({ ...prev, location: "" }));
  };

  return (
    <div className="py-40 flex justify-center">
      {toast && (
        <ToastNotifications
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}
      <DialogContent
        className="w-full max-w-[calc(100%-2rem)] sm:max-w-3xl max-h-[90vh] h-full"
        hasButtonClose={true}
      >
        <DialogTitle className="font-bebas text-[32px]">
          {activityToEdit ? "Editar atividade" : "Nova atividade"}
        </DialogTitle>
        <DialogDescription>
          {activityToEdit
            ? "Edite os campos abaixo para atualizar a atividade."
            : "Preencha os campos abaixo para criar uma nova atividade."}
        </DialogDescription>

        <form className="grid justify-items-end gap-y-10">
          <div className="flex flex-col lg:flex-row gap-y-10 lg:gap-y-0 lg:gap-x-12 w-full">
            <div className="space-y-4 flex-1">
              <div className="space-y-1.5">
                <label
                  className={`block text-sm lg:text-base font-semibold font-dm ${
                    errors.imageFile ? "text-warning-500" : "text-gray-700"
                  }`}
                >
                  Imagem <span className="text-warning-500">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <div
                    className={`flex items-center justify-center w-full h-[128px] border-1 rounded-lg ${
                      errors.imageFile ? "border-warning-500" : "border-neutral-100"
                    }`}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-[128px] object-cover rounded-lg"
                      />
                    ) : (
                      <Image
                        className={`${
                          errors.imageFile ? "text-warning-500" : "text-neutral-100"
                        }`}
                      />
                    )}
                  </div>
                </label>
                {errors.imageFile && (
                  <p className="text-warning-500 text-sm">{errors.imageFile}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <InputFieldComponent
                  id="title"
                  label="Título"
                  type="text"
                  placeholder="Ex.: Aula de Ioga"
                  required
                  value={title}
                  onChange={(e: { target: { value: SetStateAction<string>; }; }) => {
                    setTitle(e.target.value);
                    setErrors((prev) => ({ ...prev, title: "" }));
                  }}
                  className={errors.title ? "border-warning-500" : ""}
                />
                {errors.title && (
                  <p className="text-warning-500 text-sm">{errors.title}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <InputFieldComponent
                  id="description"
                  label="Descrição"
                  type="textarea"
                  placeholder="Como será a atividade? Quais as regras? O que é necessário para participar?"
                  className={`h-32 ${errors.description ? "border-warning-500" : ""}`}
                  required
                  value={description}
                  onChange={(e: { target: { value: SetStateAction<string>; }; }) => {
                    setDescription(e.target.value);
                    setErrors((prev) => ({ ...prev, description: "" }));
                  }}
                />
                {errors.description && (
                  <p className="text-warning-500 text-sm">{errors.description}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <InputFieldComponent
                  id="date"
                  label="Data"
                  type="date"
                  className={`text-neutral-500 fill-neutral-500 ${errors.scheduledDate ? "border-warning-500" : ""}`}
                  required
                  value={scheduledDate}
                  onChange={(e: { target: { value: SetStateAction<string>; }; }) => {
                    setScheduledDate(e.target.value);
                    setErrors((prev) => ({ ...prev, scheduledDate: "" }));
                  }}
                />
                {errors.scheduledDate && (
                  <p className="text-warning-500 text-sm">{errors.scheduledDate}</p>
                )}
              </div>
            </div>

            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <label
                  className={`block text-sm lg:text-base font-semibold font-dm ${
                    errors.typeId ? "text-warning-500" : "text-gray-700"
                  }`}
                >
                  Tipo de atividade <span className="text-warning-500">*</span>
                </label>
                <div className="overflow-auto max-w-fit lg:max-w-80 flex gap-x-2">
                  {activityTypes.map((activityType: ActivityType, index: number) => (
                    <CardUserComponent
                      key={index}
                      nameActivity={activityType.name}
                      pathImage={activityType.image}
                      className={selectedTypeId === activityType.id ? "border-primary-500" : ""}
                      isActive={selectedTypeId === activityType.id}
                      onClick={() => handleSelectType(activityType.id)}
                    />
                  ))}
                </div>
                {errors.typeId && (
                  <p className="text-warning-500 text-sm">{errors.typeId}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  className={`block text-sm lg:text-base font-semibold font-dm ${
                    errors.location ? "text-warning-500" : "text-gray-700"
                  }`}
                >
                  Ponto de encontro <span className="text-warning-500">*</span>
                </label>
                <MapPicker
                  initialLocation={
                    latitude !== null && longitude !== null
                      ? { lat: latitude, lng: longitude }
                      : undefined
                  }
                  onLocationSelect={handleLocationSelect}
                />
                {errors.location && (
                  <p className="text-warning-500 text-sm">{errors.location}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm lg:text-base font-semibold font-dm text-gray-700">
                  Requer aprovação para participar{" "}
                  <span className="text-warning-500">*</span>
                </label>
                <div className="flex gap-x-2">
                  <ButtonComponent
                    label="Sim"
                    variant={privateActivity ? "fullNeutral" : "outlineNeutral"}
                    size="large"
                    className="min-w-[79px]"
                    onClick={() => setPrivateActivity(true)}
                  />
                  <ButtonComponent
                    label="Não"
                    variant={!privateActivity ? "fullNeutral" : "outlineNeutral"}
                    size="large"
                    className="min-w-[79px]"
                    onClick={() => setPrivateActivity(false)}
                  />
                </div>
              </div>
            </div>
          </div>

          <ButtonComponent
            label={activityToEdit ? "Salvar" : "Criar"}
            variant="fullPrimary"
            size="large"
            className="min-w-[224px]"
            onClick={handleSaveActivity}
          />
        </form>
      </DialogContent>
    </div>
  );
}

export default ModalActivitiesComponent;
