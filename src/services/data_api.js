import API from "./api";

export async function getVbg() {
  const data = await API.get("vbg").then((res) => res);
  return data;

  //   API.get("vbg")
  //     .then(async (response) => {
  //         console.log(response);

  //       data = await response.data;
  //     })
  //     .catch((error) => console.log(error));
}

export const dataVbg = (async () => {
  const data = await API.get("vbg").then((res) => res);
  return  data;
})()
