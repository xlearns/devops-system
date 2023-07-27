import { IRequest, apiHttp } from "@/utils/http";
import { useModel } from "@umijs/max";

export function useUpdateProduct() {
  const { setProject } = useModel("global");

  async function getProduct() {
    const { data } = await apiHttp.get<IRequest>("product");
    setProject(data);
  }

  return {
    getProduct,
  };
}
