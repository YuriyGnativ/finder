import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../utils/httpService";
// import axios from "axios";

// export const auth = createAsyncThunk("root/auth", async () => {
//   const res = await API.post(
//     "pse/api/user/login",
//     JSON.stringify({
//       username: "pse",
//       password: "nc&mV4VE0KfreR9HDnr*PWRy5T",
//     })
//   )
//     .then(function (response) {
//       return response.data;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

//   return res;
// });

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async ({ search, offset }) => {
    const res = await API.get(
      `pse/api/properties?postcode=${search}&offset=${offset ? offset : 0}`
      // null,
      // {
      //   params: { postcode: search, offset },
      // }
    )
      .then(function (response) {
        console.log(response);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    return {
      params: {
        postcode: search,
        offset,
      },
      ...res,
    };
  }
);

export const fetchByMultipleCodes = createAsyncThunk(
  "data/fetchByMultipleCodes",
  async ({ search, offset }) => {
    console.log(search)
    const res = await search.reduce(async (acc, postcode) => {
      let accObj = await acc;
      const { meta, data } = await API.get(
        `pse/api/properties?postcode=${postcode}`
        // &limit=1
        // &offset=${offset ? offset : 0}
      )
        .then((res) => res.data)
        .catch((e) => {
          console.log(e);
        });
      return {
        data: [...accObj?.data, ...data],
        meta: {
          total_count:
            accObj.meta.total_count >= meta.total_count
              ? accObj.meta.total_count
              : meta.total_count,
        },
      };
    }, Promise.resolve({ data: [], meta: { total_count: 0 } }));

    // const res = await API.get(`pse/api/properties?postcode=${"AB55 6TY"}&offset=${offset ? offset : 0}`)
    // console.log("res", res);
    return {
      params: {
        postcode: search,
        offset,
      },
      ...res,
    };
  }
);
