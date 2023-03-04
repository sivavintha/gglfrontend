const helperTools = {
  formatCurrency: (value: number) => {
    let formatedValue: string = "0";
    if (value) {
      formatedValue = new Intl.NumberFormat().format(value);
    }
    return formatedValue;
  },
  decimalFormat: (value: number, fdigits: number) => {
    let formatedValue: string = "0";
    if (value) {
      formatedValue = new Intl.NumberFormat("en-Es", {
        minimumFractionDigits: fdigits,
      }).format(value);
    }
    return formatedValue;
  },
  toCamelCase: (str: string) => {
    if (str) {
      return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, "");
    }
  },
  mobileNoVisibleCustom: (number: string) => {
    if (number) {
      return (
        "x".repeat(number.length - 3) +
        number.slice(number.length - 3, number.length)
      );
    }
  },
  emailNoVisibleCustom: (mail: string) => {
    if (mail) {
      let name = mail.replace(/@.*/, "");
      return (
        "x".repeat(name.length - 3) + mail.slice(name.length - 3, name.length)
      );
    }
  },
  validateEmail: (email: string) => {
    let re =
      /^(([^<>()[]\\.,;:\s@"]+(\.[^<>()[]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
};

export default helperTools;
