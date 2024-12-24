import { SearchUser } from "global-interfaces";
import { TrimTransform, IsOptional} from "src/config/validation";


export class SearchDto implements SearchUser{
	@IsOptional()
	@TrimTransform()
	search!: string;
}