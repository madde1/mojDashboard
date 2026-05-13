
export default function Footer() {
  return (
    <footer className="bg-[#7c9a92] py-6 mt-4">
      <div className=" px-6 md:px-0 container mx-auto md:text-center text-white">
        <p>&copy; {new Date().getFullYear()} MojDashboard. Alla rättigheter förbehållna.</p>
      </div>
    </footer>
  );
}