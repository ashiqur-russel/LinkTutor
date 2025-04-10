import PaymentHistory from "@/components/modules/Payment/PaymentHistory";
import { getCurrentUser } from "@/services/AuthService";
import { fetchUserPaymentHistory } from "@/services/PaymentService";

const TutorEarningHistoryPage = async () => {
  const user = await getCurrentUser();
  const paymentHistory = await fetchUserPaymentHistory(user?.userId);

  return (
    <div>
      <PaymentHistory
        pamymentHistory={paymentHistory?.data}
        role={user?.role}
      />
    </div>
  );
};

export default TutorEarningHistoryPage;
