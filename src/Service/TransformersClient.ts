import axios ,{ AxiosTransformer} from "axios";

export function responseTransformer(transformer: AxiosTransformer ) {
    return (axios.defaults.transformResponse as AxiosTransformer[]).concat(transformer)
}
