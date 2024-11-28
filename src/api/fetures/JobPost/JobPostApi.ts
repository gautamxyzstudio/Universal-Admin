import { ApiMethodType } from "@/api/ApiConstants";
import { baseApi } from "@/api/BaseApi";
import { Endpoints } from "@/api/Endpoints";
import { IAddNewJobPostRequest, IJobPostDetails } from "./JobPostApi.types";

const jobPostApi = baseApi.injectEndpoints({
endpoints: (builder) => ({
    updateJobPost : builder.mutation<IJobPostDetails, {jobPostDetails: IAddNewJobPostRequest; jobPostId: number} >({
        query: (body:{jobPostDetails: IAddNewJobPostRequest; jobPostId: number}) => ({
            url: Endpoints.updateJobPost(body.jobPostId),
            method: ApiMethodType.patch,  
            body: body.jobPostDetails      
        })
    })
})
});
export const {useUpdateJobPostMutation} = jobPostApi;