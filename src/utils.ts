
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
