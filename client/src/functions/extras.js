export const capitalize = (name) => {
      let firstLetter = name.charAt(0).toUpperCase();
      let rest = name.slice(1);
      return firstLetter + rest
}