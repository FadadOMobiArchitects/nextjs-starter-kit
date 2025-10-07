type ActionReturnType = {
  success: boolean;
  message?: string;
};

type UncontrolledProps = {
  open?: never;
  setOpen?: never;
  children: React.ReactNode; // Required when uncontrolled
  title: string;
  description?: string;
};

type ControlledProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode; // Optional when controlled
  title: string;
  description?: string;
};

type ModeProps = UncontrolledProps | ControlledProps;
