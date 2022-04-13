import React, { FunctionComponent } from 'react';

import { Button } from '../../../../components/UI/Button';
import { Title, Text } from '../../../../components/Styled/text';

import styles from './About.module.css';

export const About: FunctionComponent = () => {
    return (
		<div className={styles.aboutContainer}>
			<div className={styles.titleContainer}>
				<Title color="black">About me and my gear</Title>
			</div>
			<div className={styles.aboutContent}>
				<div className={`${styles.textContainer} ${styles.aboutMe}`}>
					<Text size="medium" color="black" weight="normal"> 
						My name is Sebastien Gnd and i am a French amateur photographer based in Limoges, France. 
						My passion for photography dates back to 2016 when I was in high school. My other passions 
						include technology, video games, cars, cinema … I am studying in Computer Science.
					</Text>
					<div className={styles.contactButtonContainer}>
						<Button variant="classic" size="medium" to="/contact" label="Contact me" />
					</div>
				</div>
				<div className={`${styles.textContainer} ${styles.gear}`}>
					<Text size="medium" color="black" weight="normal"> 
						- Canon 70D - Sigma 18-35 f1.8 <br />
						- Sigma 50-100 f1.8 <br />
						- Tokina 11-20 f2.8 <br />
						- Manfrotto BeFree tripod <br />
						- Lowepro Protactict 450 backpack <br />
						- Hoya ND1000 (72 - 82 mm) <br />
					</Text>
				</div>
			</div>
		</div>
    )
}
