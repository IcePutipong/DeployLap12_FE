import apiClient from './AxiosClient'
import type { AxiosResponse } from 'axios'
import type { Organizer } from '@/type'

export default {
  getOrganizers(perPage: number, page: number): Promise<AxiosResponse<Organizer[]>> {
    return apiClient.get<Organizer[]>('/organizers?_limit=' + perPage + '&_page=' + page)
  },
  getOrganizerById(id: number): Promise<AxiosResponse<Organizer>> {
    return apiClient.get<Organizer>('organizers/' + id.toString())
},
saveOrganizer (organizer:Organizer) : Promise<AxiosResponse<Organizer>> {
    return apiClient.post<Organizer>('/organizers', organizer)
},
getOrganizersBy(): Promise<AxiosResponse<Organizer[]>> {
    return apiClient.get<Organizer[]>(`/organizers`)
}
}