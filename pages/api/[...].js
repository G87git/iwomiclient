import axios from "axios";

axios.defaults.baseURL = 'http://192.168.100.12:8080';
// axios.defaults.baseURL = "http://192.168.100.90:8765";

export default async function API(req, res) {
  let method = req.method.toLowerCase();
  let url = req.url?.replace("/api", "");
  let body = req.body;

  try {
    let response = await axios({
      method,
      url,
      data: body,
      headers: {
        Authorization: req.headers.authorization,
      },
    });

    console.log(response.headers);
    res.status(200).json(response.data);
    console.log(`${method.toUpperCase()} ${url} 200`);
  } catch (error) {
    res.status(400).json({ message: "An error occured", error });
    console.log(`${method.toUpperCase()} ${url} 400`);
  }
}
