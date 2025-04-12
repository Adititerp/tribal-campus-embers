
import PageTitle from "@/components/PageTitle";
import ZoneCard from "@/components/ZoneCard";

const TrainingGrounds = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <PageTitle subtitle="Build thy strength for the hunt">
          Training Grounds
        </PageTitle>
        
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <ZoneCard
            zone="Clawstone Crater"
            type="training"
            realLocation="Eppley Rec Center"
          />
          <ZoneCard
            zone="Bone Spear Range"
            type="training"
            realLocation="Ritchie Coliseum"
          />
        </div>
      </div>
    </div>
  );
};

export default TrainingGrounds;
