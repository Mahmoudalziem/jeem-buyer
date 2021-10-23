import ToastHandling from "./toastify";
import { Trans } from "react-i18next";

export const validationImage = (image, edit) => {

    if (edit) {
        return true;
      } else if (image.length === 0) {
        ToastHandling("error", <Trans>image is required</Trans>);
      } else {
        return true;
      }
};
