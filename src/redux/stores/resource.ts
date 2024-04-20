import { ResourceItem } from "@/interface/resource";
import { createSlice } from "@reduxjs/toolkit";

interface ResourceState {
  images: {
    dataSource: ResourceItem[];
  };
  audios: {
    dataSource: ResourceItem[];
  };
  videos: {
    dataSource: ResourceItem[];
  };
}
const initialState: ResourceState = {
  images: {
    dataSource: [],
  },
  audios: {
    dataSource: [],
  },
  videos: {
    dataSource: [],
  },
};

const resourceSlice = createSlice({
  name: "resource",
  initialState,
  reducers: {},
});

export default resourceSlice.reducer;
