export enum BookingStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  HELD = "held",
}

export enum CanceledBy {
  STUDENT = "student",
  TUTOR = "tutor",
}

export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  REFUNDED = "refunded",
  UNPAID = "unpaid",
  FAILED = "failed",
}

export enum BookingType {
  REQUEST = "request",
  OFFER = "offer",
  BOOKING = "booking",
}
