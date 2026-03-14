/**
 * 🎉 Festival Countdown Planner - Module Pattern
 *
 * Indian festivals ka planner bana! Module pattern use karna hai —
 * matlab ek function jo ek object return kare jisme public methods hain,
 * lekin andar ka data PRIVATE rahe (bahar se directly access na ho sake).
 *
 * Function: createFestivalManager()
 *
 * Returns an object with these PUBLIC methods:
 *
 *   - addFestival(name, date, type)
 *     date is "YYYY-MM-DD" string, type is "religious"/"national"/"cultural"
 *     Returns new total count of festivals
 *     Agar name empty or date not string or invalid type, return -1
 *     No duplicate names allowed (return -1 if exists)
 *
 *   - removeFestival(name)
 *     Returns true if removed, false if not found
 *
 *   - getAll()
 *     Returns COPY of all festivals array (not the actual private array!)
 *     Each festival: { name, date, type }
 *
 *   - getByType(type)
 *     Returns filtered array of festivals matching type
 *
 *   - getUpcoming(currentDate, n = 3)
 *     currentDate is "YYYY-MM-DD" string
 *     Returns next n festivals that have date >= currentDate
 *     Sorted by date ascending
 *
 *   - getCount()
 *     Returns total number of festivals
 *
 * PRIVATE STATE: festivals array should NOT be accessible from outside.
 *   manager.festivals should be undefined.
 *   getAll() must return a COPY so modifying it doesn't affect internal state.
 *   Two managers should be completely independent.
 *
 * Hint: This is the Module Pattern — a function that returns an object
 *   of methods, all closing over shared private variables.
 *
 * @example
 *   const mgr = createFestivalManager();
 *   mgr.addFestival("Diwali", "2025-10-20", "religious");   // => 1
 *   mgr.addFestival("Republic Day", "2025-01-26", "national"); // => 2
 *   mgr.getAll(); // => [{ name: "Diwali", ... }, { name: "Republic Day", ... }]
 *   mgr.getUpcoming("2025-01-01", 1); // => [{ name: "Republic Day", ... }]
 */
export function createFestivalManager() {
  // Your code here
  let festivalCount = 0;
  const festivalDetails = [];

  function addFestival(name,date,type){
    const allowedTypes = ["religious","national","cultural"];
    if(typeof name !== 'string' || name.length === 0 || typeof date !== 'string' || typeof(type) !== 'string' ||!allowedTypes.includes(type.toLowerCase()))
      return -1;

    // name = name[0].toUpperCase() + name.slice(1).toLowerCase()
    const ind = festivalDetails.findIndex(festival => festival.name === name);

    if(ind !== -1)
      return -1;

    festivalDetails.push( {
      name,
      date,
      type: type.toLowerCase()
    })

    return ++festivalCount;
  }

  function removeFestival(name){
    if(typeof name !== 'string' || name.length === 0)
      return false;

    // name = name[0].toUpperCase() + name.slice(1).toLowerCase();
    const ind = festivalDetails.findIndex(festival => festival.name === name)
    if(ind === -1)
      return false;

    festivalDetails.splice(ind,1)
    festivalCount--;
    return true; 
  }

  function getAll(){
    return structuredClone(festivalDetails)
  }

  function getByType(type){
    return structuredClone(festivalDetails.filter(fest => fest.type === type.toLowerCase()));
  }

  function getUpcoming(currentDate, n = 3){
    if(typeof currentDate !== 'string' || !Number.isInteger(n))
      return [];

    const sortedFestDetails = festivalDetails.toSorted((a,b) => {
      if(a.date <= b.date)
        return -1;
      return 1;
    })

    const ind = sortedFestDetails.findIndex(fest => fest.date >= currentDate);

    if(ind === -1)
      return [];

    return structuredClone(sortedFestDetails.slice(ind,ind+n));

  }

  function getCount(){
    return festivalCount;
  }

  return {
    addFestival,
    removeFestival,
    getAll,
    getByType,
    getUpcoming,
    getCount
  }
}

const mgr = createFestivalManager();
console.log(mgr.addFestival("Diwali", "2025-10-20", "religious"));   // => 1
console.log(mgr.addFestival("Republic Day", "2025-01-26", "national")); // => 2
console.log(mgr.getAll()); // => [{ name: "Diwali", ... }, { name: "Republic Day", ... }]
console.log(mgr.getUpcoming("2025-01-01", 1)); // => [{ name: "Republic Day", ... }]