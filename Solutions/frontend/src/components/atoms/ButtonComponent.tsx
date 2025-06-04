import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonComponentProps extends Omit<NativeButtonProps, 'ref'> {
  label: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant: 'fullPrimary' | 'outlinePrimary' | 'fullNeutral' | 'outlineNeutral' | 'ghost';
  size?: 'large' | 'small';
  type?: 'button' | 'submit' | 'reset';
}

const buttonStyles = {
  fullPrimary: {
    large: 'cursor-pointer bg-primary-500 hover:translate-y-[1px] hover:bg-primary-600 transition-all duration-200 ease-in-out font-bold text-sm lg:text-base leading-[24px] rounded-[4px] px-[12px] flex items-center justify-center gap-[6px] h-[48px] text-white w-[133px] w-fit',
    small: 'cursor-pointer bg-primary-500 hover:translate-y-[1px] hover:bg-primary-600 transition-all duration-200 ease-in-out font-bold text-[14px] leading-[20px] rounded-[4px] px-[8px] flex items-center justify-center gap-[4px] h-[40px] text-white w-[109px] w-fit',
  },
  outlinePrimary: {
    large: 'cursor-pointer bg-white border hover:translate-y-[1px] border-1 border-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-200 ease-in-out font-bold text-sm lg:text-base leading-[24px] rounded-[4px] px-[12px] flex items-center justify-center gap-[6px] h-[48px] text-primary-500 w-[133px] w-fit',
    small: 'cursor-pointer bg-white border hover:translate-y-[1px] border-1 border-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-200 ease-in-out font-bold text-[14px] leading-[20px] rounded-[4px] px-[8px] flex items-center justify-center gap-[4px] h-[40px] text-primary-500 w-[109px] w-fit',
  },
  fullNeutral: {
    large: 'cursor-pointer bg-neutral-500 hover:translate-y-[1px] hover:bg-neutral-600 transition-all duration-200 ease-in-out font-bold text-sm lg:text-base leading-[24px] rounded-[4px] px-[12px] flex items-center justify-center gap-[6px] h-[48px] text-white w-[133px] w-fit',
    small: 'cursor-pointer bg-neutral-500 hover:translate-y-[1px] hover:bg-neutral-600 transition-all duration-200 ease-in-out font-bold text-[14px] leading-[20px] rounded-[4px] px-[8px] flex items-center justify-center gap-[4px] h-[40px] text-white w-[109px] w-fit',
  },
  outlineNeutral: {
    large: 'cursor-pointer bg-white border hover:translate-y-[1px] border-1 border-neutral-100 hover:bg-neutral-50 transition-all duration-200 ease-in-out font-bold text-sm lg:text-base leading-[24px] rounded-[4px] px-[12px] flex items-center justify-center gap-[6px] h-[48px] text-neutral-500 w-[133px] w-fit',
    small: 'cursor-pointer bg-white border hover:translate-y-[1px] border-1 border-neutral-100 hover:bg-neutral-50 transition-all duration-200 ease-in-out font-bold text-[14px] leading-[20px] rounded-[4px] px-[8px] flex items-center justify-center gap-[4px] h-[40px] text-neutral-500 w-[109px] w-fit',
  },
  ghost: {
    large: 'cursor-pointer bg-transparent hover:bg-neutral-100 transition-all duration-200 ease-in-out font-bold text-sm lg:text-base leading-[24px] rounded-[4px] px-[12px] flex items-center justify-center gap-[6px] h-[48px] text-neutral-500 w-[133px] w-fit',
    small: 'cursor-pointer bg-transparent hover:bg-neutral-100 transition-all duration-200 ease-in-out font-bold text-[14px] leading-[20px] rounded-[4px] px-[8px] flex items-center justify-center gap-[4px] h-[40px] text-neutral-500 w-[109px] w-fit',
  },
};

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonComponentProps>(
  (
    {
      label,
      onClick,
      disabled = false,
      className = '',
      leftIcon,
      rightIcon,
      variant = 'fullPrimary',
      size = 'large',
      type = 'button',
    },
    ref
  ) => {
    return (
      <button
        type={type}
        disabled={disabled}
        aria-disabled={disabled}
        aria-label={typeof label === 'string' ? label : undefined}
        className={twMerge(
          buttonStyles[variant][size],
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          className
        )}
        onClick={onClick}
        ref={ref}
      >
        {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
        {label}
        {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
      </button>
    );
  }
);

ButtonComponent.displayName = 'ButtonComponent';

export default ButtonComponent;