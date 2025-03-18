
import { Droplet, Hospital } from 'lucide-react';

const RoleSelector = ({ role, setRole }) => {
  return (
    <div className="flex justify-center mb-6 space-x-4">
      <button
        type="button"
        onClick={() => setRole('donor')}
        className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
          role === 'donor' ? 'bg-blood/10 border border-blood' : 'bg-secondary hover:bg-blood/5'
        }`}
      >
        <Droplet size={24} className={role === 'donor' ? 'text-blood' : 'text-muted-foreground'} />
        <span className={`mt-2 font-medium ${role === 'donor' ? 'text-blood' : 'text-muted-foreground'}`}>
          Donor
        </span>
      </button>
      
      <button
        type="button"
        onClick={() => setRole('hospital')}
        className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
          role === 'hospital' ? 'bg-blood/10 border border-blood' : 'bg-secondary hover:bg-blood/5'
        }`}
      >
        <Hospital size={24} className={role === 'hospital' ? 'text-blood' : 'text-muted-foreground'} />
        <span className={`mt-2 font-medium ${role === 'hospital' ? 'text-blood' : 'text-muted-foreground'}`}>
          Hospital
        </span>
      </button>
    </div>
  );
};

export default RoleSelector;
