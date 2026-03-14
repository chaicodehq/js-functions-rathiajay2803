/**
 * 🚂 Dabbawala Delivery Tracker - Closures
 *
 * Mumbai ke famous dabbawala system ka tracker bana! Yahan closure ka
 * use hoga — ek function ke andar private state rakhna hai jo bahar se
 * directly access nahi ho sakta. Sirf returned methods se access hoga.
 *
 * Function: createDabbawala(name, area)
 *
 * Returns an object with these methods (sab ek hi private state share karte hain):
 *
 *   - addDelivery(from, to)
 *     Adds a new delivery. Returns auto-incremented id (starting from 1).
 *     Each delivery: { id, from, to, status: "pending" }
 *     Agar from ya to empty/missing, return -1
 *
 *   - completeDelivery(id)
 *     Marks delivery as "completed". Returns true if found and was pending.
 *     Returns false if not found or already completed.
 *
 *   - getActiveDeliveries()
 *     Returns array of deliveries with status "pending" (copies, not references)
 *
 *   - getStats()
 *     Returns: { name, area, total, completed, pending, successRate }
 *     successRate = completed/total as percentage string "85.00%" (toFixed(2) + "%")
 *     Agar total is 0, successRate = "0.00%"
 *
 *   - reset()
 *     Clears all deliveries, resets id counter to 0. Returns true.
 *
 * IMPORTANT: Private state (deliveries array, nextId counter) should NOT
 *   be accessible as properties on the returned object.
 *   Two instances created with createDabbawala should be completely independent.
 *
 * Hint: Use closure to keep variables private. The returned object's methods
 *   form a closure over those variables.
 *
 * @param {string} name - Dabbawala's name
 * @param {string} area - Delivery area
 * @returns {object} Object with delivery management methods
 *
 * @example
 *   const ram = createDabbawala("Ram", "Dadar");
 *   ram.addDelivery("Andheri", "Churchgate"); // => 1
 *   ram.addDelivery("Bandra", "CST");         // => 2
 *   ram.completeDelivery(1);                   // => true
 *   ram.getStats();
 *   // => { name: "Ram", area: "Dadar", total: 2, completed: 1, pending: 1, successRate: "50.00%" }
 */
export function createDabbawala(name, area) {
  // Your code here
  let id = 0;
  let deliveries = [];

  const addDelivery = (from, to) => {
    if(typeof from !== 'string' || typeof to !== 'string' || !from || !to)
      return -1;

    const delivery = {
      id: ++id,
      from,
      to,
      status: 'pending'
    }
    
    deliveries.push(delivery);
    return id;
  }

  const completeDelivery = (id) => {
    if(typeof id !== 'number') return false;

    const deliveryData = deliveries.find(delivery => delivery.id === id);

    if(!deliveryData || deliveryData.status === 'completed')
      return false;

    deliveryData.status = "completed";
    return true;
  }

  const getActiveDeliveries = () => {
    return structuredClone(deliveries.filter(delivery => delivery.status === 'pending'));
  }

  const getStats = () => {
    const {completed,pending} = deliveries.reduce((acc,{status}) => {
      status = status.trim().toLowerCase();
      acc[status] = (acc[status] ?? 0)+1;
      return acc;
    }, {
      completed:0,
      pending: 0,
    })

    const total = deliveries.length;
    const successRate = total === 0 ? '0.00%' : ((completed/total)*100).toFixed(2) + '%';

    return {
      name, 
      area,
      total,
      completed,
      pending,
      successRate
    }
  }

  const reset = () => {
    deliveries = [];
    id = 0;
    return true;
  }

  return {
    addDelivery,
    completeDelivery,
    getActiveDeliveries,
    getStats,
    reset
  }
}


const ram = createDabbawala("Ram", "Dadar");
console.log(ram.addDelivery("Andheri", "Churchgate")) // => 1
console.log(ram.addDelivery("Bandra", "CST"))         // => 2
console.log( ram.completeDelivery(1));              // => true
console.log(ram.getStats());