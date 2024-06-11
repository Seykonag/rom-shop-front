interface PaidOrder {
    orderID: number;
    paymentID: string;
    payerId: string;
    email: string;
    firstName: string;
    lastName: string;
    transactionId: string;
    currency: string;
    total: string;
    href: string;
    created: Date;
    updated: Date;
  }

  export async function fetchPaidOrderData(): Promise<PaidOrder[]> {
    try {
      const response = await fetch('https://rom-shop-0c9c08d95305.herokuapp.com/pay/all', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      });
      const PaidOrderData: PaidOrder[] = await response.json();
      return PaidOrderData;
    } catch (error) {
      console.error('Error fetching PaidOrder data:', error);
      throw new Error('Failed to fetch PaidOrder data');
    }
  }

  
  export const PaidOrderDataProvider = {
    getList: async (resource: string, params: any) => {
      const PaidOrderData: PaidOrder[] = await fetchPaidOrderData();
      if (resource === 'paypalorders') {
        console.log(PaidOrderData)
        return {
          data: PaidOrderData,
          total: PaidOrderData.length,
        };
      }
      return { data: [], total: 0 };
    },
  };
  
  