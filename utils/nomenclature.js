import apiClient from "api";

export const types = {
  lib: { type: "text" },
  taux: { type: "float" },
  mnt: { type: "number" },
  dat: { type: "date" },
  mdp: { type: "password" },
};

export const getNomenclature = (code) => {
  return new Promise(async (resolve, _) => {
    try {
      let response = await apiClient({
        method: "get",
        url: `/getNomenDataByTabcd/${code}`,
      });
      if (response.data.status === "01") {
        resolve({
          data: response.data.data,
          col: JSON.parse(response.data.col),
        });
      } else {
        throw new Error(response.data.message || "An error occured");
      }
    } catch (error) {
      resolve({ data: [], error });
    }
  });
};

export const getAllNomenclature = () => {
  return new Promise(async (resolve, _) => {
    try {
      let response = await apiClient({
        method: "get",
        url: "/getAllNomen",
      });
      if (response.data.status === "01") {
        resolve({ data: response.data.data });
      } else {
        throw new Error(response.data.message || "An error occured");
      }
      resolve({ data: [] });
    } catch (error) {
      resolve({ data: [], error });
    }
  });
};

async function getDropdownData({ service, key, value, stateKey, arg = "" }) {
  let objs = arg.split("|").map((ob) => {
    let [key, value] = ob.split(":");
    return { [key]: value };
  });
  let body = {};
  for (let i of objs) {
    body = { ...body, ...i };
  }
  let method = body.method || "get";
  let arrKey = body.arrKey;
  delete body.method;
  if (!state[stateKey]) {
    try {
      let response = await apiClient({ method, url: "/" + service, body });
      let responseObject = response.data;
      if (arrKey) {
        arrKey = arrKey.trim();
        data = responseObject[arrKey].map((item) => ({
          label: item[value],
          value: item[key],
        }));
      } else {
        data = responseObject.map((item) => ({
          label: item[value],
          value: item[key],
        }));
      }

      return { [stateKey]: data };
    } catch {
      return {};
    }
  }
}

export const getNomenclatureFields = ({col = {}, name, handleChange, value, format}) => {
  if (col.name === "") {
    return;
  }
  const type = types[format.replace(/[0-9]/g, "")] || {
    type: "text",
  };

  if (col.dropdown) {
    getDropdownData({ ...col.dropdown, stateKey: col.format });
    let data = state[col.format] || [];
    if (col.dropdown.type === "1") {
      return (
        <div className="col-sm-3 my-1" key={i}>
          <h6 className="text-dark">{col.name}</h6>
          <AutoComplete
            value={state.body[col.format] || ""}
            data={data.map((act) => `${act.label} - ${act.value}`)}
            onChange={(value) => handleChange({ name: col.format, value })}
          />
        </div>
      );
    }
    return (
      <div className="col-sm-3 my-1" key={i}>
        <h6 className="text-dark">{col.name}</h6>
        <select
          className="form-select"
          value={state.body[col.format] || ""}
          onChange={(e) =>
            handleChange({
              name: col.format,
              value: e.target.value,
            })
          }
          required
        >
          <option value={null}>Choisir...</option>
          {data.map((item, i) => (
            <option value={item.value} key={i}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  if (type.type === "float") {
    return (
      <div className="col-sm-3 my-1" key={i}>
        <h6 className="text-dark">{col.name}</h6>
        <InputNumber
          value={state.body[col.format] || ""}
          onChange={(e) => handleChange({ name: col.format, value: e })}
        />
      </div>
    );
  } else if (type.type === "number") {
    return (
      <div className="col-sm-3 my-1" key={i}>
        <h6 className="text-dark">{col.name}</h6>
        <InputNumber
          value={state.body[col.format] || ""}
          onChange={(e) =>
            handleChange({
              name: col.format,
              value: parseInt(e),
            })
          }
        />
      </div>
    );
  } else if (col.isRich) {
    return (
      <Col lg={6} key={i}>
        <h6 className="text-dark">{col.name}</h6>
        <textarea
          type={type ? type.type : "text"}
          placeholder={col.format}
          contentEditable="false"
          name={col.format}
          required={col.format === "acscd"}
          value={state.body[col.format] || ""}
          onChange={(e) => {
            handleChange({
              name: col.format,
              value: e.target.value,
            });
          }}
          className="form-control"
        ></textarea>
      </Col>
    );
  } else {
    return (
      <Col span={6} key={i}>
        <h6 className="text-dark">{col.name}</h6>
        <Input
          type={type ? type.type : "text"}
          placeholder={col.format}
          contentEditable="false"
          name={col.format}
          required={col.format === "acscd"}
          value={state.body[col.format] || ""}
          onChange={(e) => {
            type.decimal
              ? handleChange({
                  name: col.format,
                  value: parseInt(e.target.value) || state.body[col.format],
                })
              : handleChange({
                  name: col.format,
                  value: e.target.value,
                });
          }}
        />
      </Col>
    );
  }
};
