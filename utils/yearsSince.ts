export function yearsSince(date: string | Date): number {
  const givenDate = typeof date === "string" ? new Date(date) : date;
  const today = new Date();

  let years = today.getFullYear() - givenDate.getFullYear();
  const hasNotHadBirthday =
    today.getMonth() < givenDate.getMonth() ||
    (today.getMonth() === givenDate.getMonth() &&
      today.getDate() < givenDate.getDate());

  if (hasNotHadBirthday) {
    years--;
  }

  return years;
}
