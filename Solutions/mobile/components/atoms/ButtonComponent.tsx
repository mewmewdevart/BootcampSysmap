import { colors } from '@/themes/variables';
import React, { forwardRef } from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';

export type ButtonVariant =
  | 'fullPrimary'
  | 'outlinePrimary'
  | 'fullNeutral'
  | 'outlineNeutral'
  | 'ghost';
export type ButtonSize = 'large' | 'small';

export interface ButtonComponentProps extends PressableProps {
  label?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const BUTTON_STYLES: Record<
  ButtonVariant,
  Record<
    ButtonSize,
    {
      button: object;
      text: object;
      icon: object;
    }
  >
> = {
  fullPrimary: {
    large: {
      button: {
        backgroundColor: colors.primary500,
        paddingHorizontal: 12,
        height: 48,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
      },
      icon: {
        marginHorizontal: 6,
      },
    },
    small: {
      button: {
        backgroundColor: colors.primary500,
        paddingHorizontal: 8,
        height: 40,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white',
      },
      icon: {
        marginHorizontal: 4,
      },
    },
  },
  outlinePrimary: {
    large: {
      button: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: colors.primary500,
        paddingHorizontal: 12,
        height: 48,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.primary500,
      },
      icon: {
        marginHorizontal: 6,
      },
    },
    small: {
      button: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: colors.primary500,
        paddingHorizontal: 8,
        height: 40,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: colors.primary500,
      },
      icon: {
        marginHorizontal: 4,
      },
    },
  },
  fullNeutral: {
    large: {
      button: {
        backgroundColor: colors.neutral500,
        paddingHorizontal: 12,
        height: 48,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.neutral00,
      },
      icon: {
        marginHorizontal: 6,
      },
    },
    small: {
      button: {
        backgroundColor: colors.neutral500,
        paddingHorizontal: 8,
        height: 40,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white',
      },
      icon: {
        marginHorizontal: 4,
      },
    },
  },
  outlineNeutral: {
    large: {
      button: {
        backgroundColor: colors.neutral00,
        borderWidth: 1,
        borderColor: colors.neutral100,
        paddingHorizontal: 12,
        height: 48,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.neutral500,
      },
      icon: {
        marginHorizontal: 6,
      },
    },
    small: {
      button: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: colors.neutral100,
        paddingHorizontal: 8,
        height: 40,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: colors.neutral500,
      },
      icon: {
        marginHorizontal: 4,
      },
    },
  },
  ghost: {
    large: {
      button: {
        backgroundColor: 'transparent',
        paddingHorizontal: 12,
        height: 48,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.neutral500,
      },
      icon: {
        marginHorizontal: 6,
      },
    },
    small: {
      button: {
        backgroundColor: 'transparent',
        paddingHorizontal: 8,
        height: 40,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: colors.neutral500,
      },
      icon: {
        marginHorizontal: 4,
      },
    },
  },
};

const ButtonComponent = forwardRef<typeof Pressable, ButtonComponentProps>(
  (
    { label, leftIcon, rightIcon, variant = 'fullPrimary', size = 'large', style, ...rest },
    ref
  ) => {
    const variantStyles = BUTTON_STYLES[variant][size];

    return (
      <Pressable
        ref={ref as React.Ref<View>}
        style={({ pressed }) => [
          variantStyles.button,
          pressed && { opacity: 0.8 },
          style,
        ]}
        {...rest}
      >
        {leftIcon && <View style={variantStyles.icon}>{leftIcon}</View>}
        {typeof label === 'string' ? (
          <Text style={variantStyles.text}>{label}</Text>
        ) : (
          label
        )}
        {rightIcon && <View style={variantStyles.icon}>{rightIcon}</View>}
      </Pressable>
    );
  }
);

ButtonComponent.displayName = 'ButtonComponent';

export default ButtonComponent;
