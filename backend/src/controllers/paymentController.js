import express from 'express';
import Przelewy24 from '../config/p24';
import jwt from 'jsonwebtoken';
import { isLoged, isDoctor } from '../validators/authValidator';
import jwtConfig from '../config/jwt';
import User from '../models/User';

const router = express.Router();

let token = null;

router.post('/verify', async (req, res) => {
  const { p24_session_id, p24_amount, p24_order_id, p24_currency, p24_sign } = req.body;

  const P24 = new Przelewy24('XXXXX', 'XXXXXX', 'XXXXXXXXXXXXXXXX', true);

  P24.setSessionId(p24_session_id);
  P24.setAmount(p24_amount);
  P24.setCurrency(p24_currency);
  P24.setOrderId(p24_order_id);

  try {
    await P24.verify(p24_sign);

    const { id } = token && token !== 'null' && await jwt.verify(token, jwtConfig.secret);

    const updated = await User.update({
      paid: new Date().toString()
    }, { where: { id } });

    return res.send({ status: updated });
  } catch (e) {
    return res.send({ status: false });
  }
});

router.post('/send', isLoged, isDoctor, async (req, res) => {
  const headerToken = req.headers['token'];

  token = headerToken;

  const P24 = new Przelewy24('XXXXXX', 'XXXXXX', 'XXXXXXXXXXX', true);

  P24.setSessionId(new Date().getUTCMilliseconds());
  P24.setAmount(1);
  P24.setCurrency('PLN');
  P24.setDescription('Simple payment.');
  P24.setEmail('test@gmail.com');
  P24.setCountry('PL');
  P24.setUrlStatus('XXXXXXXXXXXXXXXXXXXXX');
  P24.setUrlReturn('XXXXXXXXXXXXXXXXXXXXX');

  try {
    const token = await P24.register();
    const url = P24.getPayByLinkUrl(token);

    return res.send({
      token,
      url
    });
  } catch (e) {
    return res.send({ response: e });
  }
});

export default router;
