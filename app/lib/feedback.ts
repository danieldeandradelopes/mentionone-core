import Feedback from "../entities/Feedback";
import { feedbackStore } from "./storage";

export async function getAllFeedbacks(): Promise<Feedback[]> {
  return feedbackStore.getAll();
}

export async function getDashboardStats() {
  const feedbacks = await getAllFeedbacks();

  const total = feedbacks.length;

  const lastFive = feedbacks.slice(-5).reverse();

  return {
    total,
    lastFive,
  };
}
