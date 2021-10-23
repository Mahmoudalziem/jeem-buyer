import ToastHandling from "../common/toastify";
import { Trans } from "react-i18next";

export const validationRate = (rate) => {
  if (!rate) {
    ToastHandling("error", <Trans>RATE_REQUIRED</Trans>);
  } else {
    return true;
  }
};
