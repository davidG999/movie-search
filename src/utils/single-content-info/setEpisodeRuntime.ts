const setEpisodeRuntime = (episode_run_time: any) => {
  if (episode_run_time) {
    if (episode_run_time?.length === 0) return "N/A"
    if (episode_run_time?.length === 1) return episode_run_time + "m"
    if (episode_run_time?.length > 1) {
      episode_run_time.sort((a: number, b: number) => a - b)
      return episode_run_time[0] + "-" + episode_run_time.at(-1) + "m"
    }
  }
}

export default setEpisodeRuntime
