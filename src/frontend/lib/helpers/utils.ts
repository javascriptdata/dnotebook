import { outputError } from "../typings/types";

export const formatErrorMessage = (err: Error): outputError => {
  return { output: err.message, name: err.name, __$hasError: true };
};

export const cleanErrorMessage = (err: outputError) => {
  const errorMessage = err.output.split("\n")[0];
  const errorName = err.name;
  const fullErrorMessage = errorName + ": " + errorMessage;
  return fullErrorMessage;
};

export const download = (name: string, type: string, data: string) => {
  const blob = new Blob([data], { type: "text/html" });
  const url = (window.URL || window.webkitURL).createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `${name}.${type}`;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  link.remove();
  return link;
};
