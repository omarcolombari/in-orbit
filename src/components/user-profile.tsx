import { useGetProfile } from '../http/generated/api'

export function UserProfile() {
  const { data: profileData, isLoading: isLoadingProfile } = useGetProfile()

  if (!profileData || isLoadingProfile) {
    return null
  }
  return (
    <div className="flex items-center gap-3">
      <img
        src={profileData.profile.avatarUrl}
        alt=""
        className="size-10 rounded-md"
      />
      <div className="flex flex-col gap-0.5">
        <span className="text-md font-semibold">
          {profileData.profile.name}
        </span>
        <span className="text-xs text-zinc-400">
          {profileData.profile.email ?? 'Sem e-mail'}
        </span>
      </div>
    </div>
  )
}
