import { useState } from "react";
import { IServeList } from "../interface";

export function useDataSource() {
  const [dataSource, setDataSource] = useState<readonly IServeList[]>();

  function changeEditState(state: boolean, id: string | number) {
    setDataSource((list) => {
      const data = list?.map((item) => {
        if (id == item.id) {
          item.isEdit = state;
        }
        return item;
      });
      return data;
    });
  }

  return {
    changeEditState,
    dataSource,
    setDataSource,
  };
}
