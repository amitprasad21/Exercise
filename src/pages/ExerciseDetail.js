import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import {
  exerciseDbEndpoints,
  exerciseOptions,
  fetchData,
  youtubeEndpoints,
  youtubeOptions,
} from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMSG, setErrorMSG] = useState('');
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchExercisesData = async () => {
      setIsLoading(true);
      setErrorMSG('');
      try {
        const exerciseDetailData = await fetchData(exerciseDbEndpoints.exerciseById(id), exerciseOptions);
        setExerciseDetail(exerciseDetailData);

        const [exerciseVideosData, targetMuscleExercisesData, equipmentExercisesData] = await Promise.all([
          fetchData(youtubeEndpoints.search(`${exerciseDetailData.name} exercise`), youtubeOptions),
          fetchData(exerciseDbEndpoints.targetExercises(exerciseDetailData.target), exerciseOptions),
          fetchData(exerciseDbEndpoints.equipmentExercises(exerciseDetailData.equipment), exerciseOptions),
        ]);

        setExerciseVideos(exerciseVideosData.contents || []);
        setTargetMuscleExercises(Array.isArray(targetMuscleExercisesData) ? targetMuscleExercisesData : []);
        setEquipmentExercises(Array.isArray(equipmentExercisesData) ? equipmentExercisesData : []);
      } catch (error) {
        setErrorMSG(error.message || 'Error occurred while loading exercise details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercisesData();
  }, [id]);

  if (isLoading) return <Box p="20px" textAlign="center" mt="100px">Loading Exercise Details...</Box>;
  if (errorMSG) return <Box p="20px" textAlign="center" color="error.main" mt="100px">{errorMSG}</Box>;
  if (!exerciseDetail || Object.keys(exerciseDetail).length === 0) return <div>No Data</div>;

  return (
    <Box sx={{ mt: { lg: '96px', xs: '60px' } }}>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  );
};

export default ExerciseDetail;
