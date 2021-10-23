import ToastHandling from "./toastify";
import { Trans } from "react-i18next";

export const validationDesc = (desc) => {
  if (!desc) {
    ToastHandling("error", <Trans>Description is required</Trans>);
  } else {
    return true;
  }
};
