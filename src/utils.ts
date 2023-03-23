import { emptyItem } from './config';

export const getTitle = (item: { title: { 'en-US': string }}) => item.title['en-US'];

export const getType = (value: any) => {
  const type = typeof value;

  if (Array.isArray(value)) {
    return 'array';
  } else {
    return type;
  }
}

export const parseJson = (content: string) => {
  try {
    const parsed = JSON.parse(content);
    return {
      success: true,
      parsed
    };
  } catch (err: any) {
    String(err)
    return {
       success: false,
       errorMessage: String(err).replace('SyntaxError: ', '') as string,
    };
  }
};

export const readFileAsync = (file: File) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  })
};

export const getEmptyItem = () => ({
  ...emptyItem,
  date: new Date().getTime(),
});

export const isJsonDaedalusCompatible = (json: any) => {
  let compatible = true;
  if (!json.updatedAt) {
    compatible = false;
  }
  if (!Array.isArray(json.items)) {
    compatible = false;
  }
  if (json.items && json.items.length) {
    json.items.forEach((item: any) => {
      if (
        !item.title ||
        !item.content ||
        !item.target ||
        !item.action ||
        !item.date ||
        !item.type
      ) {
        compatible = false;
       }
    })
  }
  return compatible;
}



