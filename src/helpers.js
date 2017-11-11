/* eslint-disable */
import Yup from 'yup';

export function equalTo(ref: any, msg: any) {
  return Yup.mixed().test({
    name: 'equalTo',
    exclusive: false,
    message: msg || '${path} must be the same as ${reference}',
    params: {
      reference: ref.path,
    },
    test(value: any) {
      return value === this.resolve(ref);
    },
  });
}
