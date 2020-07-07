import utils from '@utils';
import { ZORO_JSON_FILENAME } from '@constants';

const { isPlainObject } = utils.types;

const checkZoroJSONFormat = (zoroJSON: any) => {
  if (!isPlainObject(zoroJSON)) {
    throw new Error(
      `cannt find ${ZORO_JSON_FILENAME}, or its format isn't JSON format`
    );
  }

  if (!zoroJSON?.plugin) {
    throw new Error(`the ${'plugin'.bold} field is necessary`);
  }
};

export default checkZoroJSONFormat;
