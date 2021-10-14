export interface HashCompare {
  compare: (value: string, hashed_value: string) => Promise<boolean>
}
