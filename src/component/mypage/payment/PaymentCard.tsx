import Card from '@/component/common/card/Card';
import { formatNumberToWon } from '@/utils/format/formatUtil';
interface FareItem {
  label: string;
  price: number;
  quantity: number;
  pricePaid: number;
}

const fareBreakdown: FareItem[] = [
  { label: '성인', price: 225186, quantity: 3, pricePaid: 225186 },
  { label: '수수료', price: 0, quantity: 3, pricePaid: 0 },
];

const PaymentCard = () => {
  const totalAmount = fareBreakdown.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <Card className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <Card.Content>
        <div className="mb-6 flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">총 결제 금액</span>
          <span className="text-2xl font-extrabold text-blue-600">
            {formatNumberToWon(fareBreakdown[0].pricePaid)}
          </span>
        </div>
        <div className="space-y-3 bg-gray-100 p-4">
          <ul className="space-y-3">
            {fareBreakdown.map((item, index) => (
              <li key={index} className="flex justify-between text-sm text-gray-700">
                {item.label}
                <span>{formatNumberToWon(item.price)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="my-4 border-t-1 border-dashed border-blue-500"></div>

        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">총 예약 금액</span>
          <span className="text-xl font-extrabold text-blue-600">
            {formatNumberToWon(totalAmount)}
          </span>
        </div>

        <div className="space-y-3 bg-gray-100 p-4">
          <ul className="space-y-3">
            {fareBreakdown.map((item, index) => (
              <li key={index} className="flex justify-between text-sm text-gray-700">
                <span>
                  {item.label} x {item.quantity}
                </span>
                <span>{formatNumberToWon(item.price * item.quantity)}</span>
              </li>
            ))}
            <li className="flex justify-between text-sm text-gray-700">
              <span>할인코드</span>
              <span>0원</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 text-center text-xs text-red-500">
          결제 완료 후에는 결제 수단 변경이 불가능하오니 유의해주시기 바랍니다.
        </div>
      </Card.Content>
    </Card>
  );
};

export default PaymentCard;
