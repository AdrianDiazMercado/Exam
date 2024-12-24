/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal, { SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { DisplayAlertInterface } from '../interfaces/DisplayAlertInterfaces';

class SweetAlert {
  private MySwal = withReactContent(Swal);
  public displayAlert({
    success = false,
    msg = '',
    errors = [],
    propsAlert = {},
  }: DisplayAlertInterface): Promise<SweetAlertResult> {
    if (success) {
      return this.MySwal.fire({
        title: msg,
        icon: 'success',
        timer: 2000,
        ...propsAlert,
      });
    }

    if (!success && errors.length === 0) {
      return this.MySwal.fire({
        title: msg,
        icon: 'error',
        timer: 2500,
        ...propsAlert,
      });
    }

    const errorsMsgs = errors.map((error: any) => {
        const [field, detail] = error.campos;
        const errorMessages = Object.values(detail.errores)
          .map((errMsg) => `<ul> <li> <strong>${field} :</strong> ${errMsg}</li> </ul>`)
          .join('');
        return errorMessages;
      })
      .join('');

    return this.MySwal.fire({
      title: msg,
      icon: 'error',
      html: `<ul>${errorsMsgs}</ul>`,
      ...propsAlert,
    });
  }
}

export const sweetAlert = new SweetAlert();
