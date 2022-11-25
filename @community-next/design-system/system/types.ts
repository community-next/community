export type OmitCommonProps<
  Target,
  OmitAdditionalProps extends keyof any = never
> = Omit<Target, "as" | OmitAdditionalProps>;

export type AsElement<Props = any> = React.ElementType<Props>;

export type RightJoinProps<
  SourceProps extends object = {},
  OverrideProps extends object = {}
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps;

export type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  AdditionalProps extends object = {},
  AsComponent extends AsElement = AsElement
> = RightJoinProps<ComponentProps, AdditionalProps> &
  RightJoinProps<AsProps, AdditionalProps> & {
    as?: AsComponent;
  };

export type PropsOf<T extends AsElement> = React.ComponentPropsWithoutRef<T> & {
  as?: AsElement;
};

type ComponentWithAs<Component extends AsElement, Props extends object = {}> = {
  <AsComponent extends AsElement = Component>(
    props: MergeWithAs<
      React.ComponentProps<Component>,
      React.ComponentProps<AsComponent>,
      Props,
      AsComponent
    >
  ): JSX.Element;

  displayName?: string;
  propTypes?: React.WeakValidationMap<any>;
  contextTypes?: React.ValidationMap<any>;
  defaultProps?: Partial<any>;
  id?: string;
};

export type BorderColor =
  | true
  | "gray"
  | "blue"
  | "green"
  | "orange"
  | "red"
  | "yellow";

export type BackgroundColor =
  | true
  | "gray"
  | "gray-secondary"
  | "blue"
  | "green"
  | "orange"
  | "red"
  | "yellow";

export type TextColor =
  | "content1"
  | "content2"
  | "content3"
  | "blue"
  | "green"
  | "orange"
  | "red"
  | "yellow";

export type Rounded = true | "none" | "sm" | "base" | "md" | "lg" | "full";
export type Border = true | "none" | "2";
export type FontWeight = "normal" | "medium" | "semibold" | "bold";
export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
export type Leading =
  | "none"
  | "tight"
  | "snug"
  | "normal"
  | "relaxed"
  | "loose";

export interface BaseProps {
  borderColor?: BorderColor;
  backgroundColor?: BackgroundColor;
  color?: TextColor;
  hoverColor?: TextColor;
  rounded?: Rounded;
  border?: Border;
  borderTop?: Border;
  borderRight?: Border;
  borderBottom?: Border;
  borderLeft?: Border;
  fontWeight?: FontWeight;
  textSize?: TextSize;
  leading?: Leading;
}

export interface AsComponent<T extends AsElement, P = {}>
  extends ComponentWithAs<T, BaseProps & Omit<P, "color">> {}

export type DOMElements = keyof JSX.IntrinsicElements;

export type HTMLAsComponents = {
  [Tag in DOMElements]: AsComponent<Tag, {}>;
};

export type HTMLAsProps<T extends AsElement> = Omit<
  PropsOf<T>,
  "ref" | "color"
> &
  BaseProps & {
    as?: AsElement;
  };
