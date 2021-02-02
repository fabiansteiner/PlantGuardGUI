import * as React from "react";
import {Link} from 'react-router-dom';

export const AddPlantLink = props => <Link to="/plant" {...props} />;
export const AddRuleLink = props => <Link to="/rule" {...props} />;
export const HomeLink = props => <Link to="/" {...props} />;
export const DashboardLink = props => <Link to="/dashboard" {...props} />;
