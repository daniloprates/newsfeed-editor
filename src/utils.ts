
export const getTitle = (item: { title: { 'en-US': string }}) => item.title['en-US'];


export const getType = (value: any) => {
  const type = typeof value;

  if (Array.isArray(value)) {
    return 'array';
  } else {
    return type;
  }
}
