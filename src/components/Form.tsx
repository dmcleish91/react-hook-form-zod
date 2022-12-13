import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const FormSchema = z.object({
	username: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
	confirmPassword: z.string().min(8),
	accept: z.literal(true),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function Form() {
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<FormSchemaType>({
		resolver: zodResolver(FormSchema),
	});

	const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
		console.log(data);
		alert(JSON.stringify(data));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='form-control-group'>
				<h1>Sign up</h1>
			</div>
			<div className='form-control-group'>
				<TextField
					id='outlined-basic'
					label='Username'
					variant='outlined'
					{...register('username')}
					error={errors.username !== undefined}
					helperText={errors.username?.message}
				/>
				<TextField
					id='outlined-basic'
					label='Email'
					variant='outlined'
					{...register('email')}
					error={errors.email !== undefined}
					helperText={errors.email?.message}
				/>
			</div>
			<div className='form-control-group'>
				<TextField
					id='outlined-basic'
					label='Password'
					variant='outlined'
					{...register('password')}
				/>
				<TextField
					id='outlined-basic'
					label='Confirm Password'
					variant='outlined'
					{...register('confirmPassword')}
				/>
			</div>
			<div className='form-control-group'>
				<FormControlLabel
					control={<Checkbox />}
					label='I accept the Terms of Service'
					{...register('accept')}
				/>
			</div>
			{/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
			<div className='form-control-group'>
				<Button
					variant='contained'
					size='large'
					type='submit'>
					Large
				</Button>
			</div>
		</form>
	);
}
