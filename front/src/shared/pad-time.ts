export const padTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`
}