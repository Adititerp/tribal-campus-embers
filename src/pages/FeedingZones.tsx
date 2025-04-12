
import PageTitle from "@/components/PageTitle";
import ZoneCard from "@/components/ZoneCard";

const FeedingZones = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <PageTitle subtitle="Find nourishment for thy tribe">
          Feeding Zones
        </PageTitle>
        
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <ZoneCard
            zone="Mosspit"
            type="feeding"
            realLocation="Yahentamitsi Dining"
          />
          <ZoneCard
            zone="Riverfang"
            type="feeding"
            realLocation="South Campus Dining"
          />
          <ZoneCard
            zone="Stonegrill"
            type="feeding"
            realLocation="251 North"
          />
        </div>
      </div>
    </div>
  );
};

export default FeedingZones;
