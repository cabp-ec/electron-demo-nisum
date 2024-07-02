import React from 'react';
import { ResourceListInterface } from './resource.list.interface';

export const ResourceList: React.FC<ResourceListInterface> = ({ listAudio = false }: ResourceListInterface) => {
  return (
    <div className="bg-secondary rounded text-light w-100 h-100">
      resource list: { listAudio ? 'AUDIO' : 'VIDEO'}
    </div>
  );
};
