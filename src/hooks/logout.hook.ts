import { UserService } from "@/services/user.service"
import { useRoute, useRouter } from "vue-router"

export function useLogout() {
    const router = useRouter()
    const route = useRoute()
    
    return () => {
        if (UserService.getActiveUser()) {
            UserService.logout()
            router.push('/user/login')
        }
    }
}