export default class Feedback {
  constructor(
    readonly id: string,
    readonly boxId: string,
    readonly text: string,
    readonly category: string,
    readonly createdAt: Date
  ) {}
}
