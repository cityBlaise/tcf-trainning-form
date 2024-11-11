import { FC, memo, PropsWithChildren } from "react";

const FormControl: FC<PropsWithChildren> = memo(({ children }) => {
  return <div className="grid gap-1">
    {children}
  </div>
});

export default FormControl;
