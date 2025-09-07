import React ,  { Fragment, useState, useCallback } from 'react';
import { NavLink } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import DrImage from "../../../../constants/DrImages/drProfileImage.png";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomButton from '../../../../components/CustomButton';
import CustomModal from '../../../../components/CustomModal';
import CustomList from '../../../../components/CustomList';
import CustomTextField from '../../../../components/CustomTextField';
import CustomDropdown from "../../../../components/CustomDropdown";
import "./addplan.scss"

const EditAddPlans = () => {

    const dropdownItems = ["item1", "item2", "item3"];
        const [activeDropdown, setActiveDropdown] = useState("");
    
         const [openDialog, setOpenDialog] = useState(false);
      const [listItems, setListItems] = useState([
             { name: "item1", checked: false },
            
         ]);
        const handleCheckList = useCallback((updatedItem) => {
            // eslint-disable-next-line no-confusing-arrow
            const updatedItems = listItems.map((item) =>
                item.name === updatedItem.name ? updatedItem : item,
            );
            setListItems(updatedItems);
        });   

    return (
        <>
            <nav className="NavBar-Box-one">
                <NavLink to={"/doctordashboard/doctorListing/listingdetails"}>Listing Details</NavLink>
                <NavLink to={"/doctordashboard/doctorListing/addplans"}>Add Plans</NavLink>
                <NavLink to={"/doctordashboard/doctorListing/addquestioner"}>Add Questioner</NavLink>
                <NavLink to={"/doctordashboard/doctorListing/termandcondition"}>Term & Conditions</NavLink>
            </nav>

            <div className="main-container">
                <div className="Doctor-detail-container">
                    <div className="doc-profile">
                        <div className="image-container">
                            <Box
                                sx={{ borderRadius: "8px", width: "100%", height: "100%" }}
                                component={"img"}
                                src={DrImage}
                            ></Box>
                        </div>
                        <div
                            className="Detail-container"
                            sx={{
                                // border:'1px solid',
                                // height:'60%',
                                marginTop: "1%",
                            }}
                        >
                            <Typography
                                style={{
                                    fontfamily: "Poppins",
                                    fontsize: "14px",
                                    fontstyle: "normal",
                                    fontweight: "500",
                                    lineheight: "22px",
                                    letterSpacing: "0.07px",
                                }}
                            >
                                Dr.Maria Garcia
                            </Typography>
                            <Typography
                                style={{
                                    fontfamily: "Poppins",
                                    fontsize: "10px",
                                    fontstyle: "normal",
                                    fontweight: "400",
                                    lineheight: "15px",
                                    letterSpacing: "0.08px",
                                    color: "grey",
                                }}
                            >
                                Neurologist
                            </Typography>
                        </div>
                    </div>
                    <div className="Edit-btn">
                        <CustomButton
                            label="Edit Profile"
                            isTransaprent={"false"}
                            buttonCss={{
                                display: "flex",
                                borderBottom: "1px",
                                borderTop: "1px",
                                borderRight: "1px",
                                borderLeft: "1px",
                                width: "122px",
                                height: "48px",
                                padding: "8px 16px",
                                justifycontent: "flex-end",
                                alignItems: "center",
                                gap: "8px",
                                flexShrink: "0",
                                color: "red",
                            }}
                        ></CustomButton>
                    </div>
                </div>
              
              <div className="Add-container">
                <Typography>
                    Add Plan
                </Typography>
                <div className="Add-addicon">
                    
                    <Box
                    sx={{
                        // border:'1px solid',
                        marginTop:'0.5rem'
                    }}>
                    <AddIcon/>
                    </Box>
                    <div className="Add-btn">
                        <CustomButton
                        label='Add'
                        isTransaprent={'True'}
                        isElevated
                        handleClick={() => setOpenDialog(!openDialog)}
                        buttonCss={{
                            display:'flex',
                            borderBottom:'1px',
                            borderLeft:'1px',
                            borderRight:'1px',
                            borderTop:'1px',
                            fontfamily:'poppins',
                            fontsize:'16px',
                            fontstyle:'normal',
                            fontweight:'500',
                            lineheight:'30px',
                            color:'#E72B4A'}}>
                            

                        </CustomButton>
                        <CustomModal
                        style={{
                            display:'flex',

                        }}
                isOpen={openDialog}
                            title={<Box sx={{
                                
                                
                                border:'1px solid #E6E1E5',
                                borderTop:'1px',
                                borderRight:'1px',
                                borderLeft:'1px',
                                width:'570px',
                                height:'82px',
                                display:'flex',
                                justifycontent:'flexstart'
                            }}>
                                <h2 style={{ textAlign: 'left',fontfamily:'poppins',fontSize:'20px', fontstyle:'normal', fontweight:'500', lineheight:'30px',width:'101px',height:'30px' }}>Add Plans</h2>
                            </Box>}
                            footer={
                                <Fragment>
                                    {/* <CustomButton
                                        label={"action 1"}
                                        handleClick={() => setOpenDialog(false)}
                                        isTransaprent
                                        isText
                                    /> */}
                                    {/* <CustomButton
                                        label={"action 2"}
                                        isTransaprent
                                        handleClick={() => setOpenDialog(false)}
                                        isText
                                    /> */}
                                </Fragment>
                            }
                           
                        >
                            <Box
    sx={{
        display:'flex',
        justifycontent:'space-between',
        // border:'1px solid',
        
        width:'-3%',
        marginTop:'4%',
        marginLeft:'-60%'
    }}>
    {/* <CustomList items={listItems} handleToggle={handleCheckList} /> */}
                        <CustomList
                            items={listItems}
                            handleToggle={handleCheckList}
                            // showDescription={'hello'}
                            // maxWidth={800}
                            // showAvatar
                        />
                        {/* <CustomList items={listItems} handleToggle={handleCheckList} /> */}

              <Typography>
                Messaging Plan
              </Typography>
    </Box>
    <div className="Price-duration" style={{
        display:'flex',
        justifyContent:'space-between',

    }}>
       <Box
       sx={{
        // border:'1px solid',
        marginTop:'1%'
       }}>
        
       <CustomTextField
        label='Price'
        helperText={""}
        textcss={{
            width:'250px',
            height:'56px',
            flexShrink:'0',
            color:'#787579',
            fontfamily:'poppins',
            fontsize:'16px',
            fontstyle:'normal',
            fontweight:'400',
            lineHeight:'24px'
        }}>

        </CustomTextField>
       </Box>

       <Box
       sx={{
        //   border:'1px solid',
          width:'228px',
          marginLeft:'3%',
          marginTop:'1%'
       }}>
 <CustomDropdown
                            label={"Duration"}
                            items={dropdownItems}
                            activeItem={activeDropdown}
                            handleChange={(item) => setActiveDropdown(item)}
                            dropdowncss={{
                                width:'230px',
                                height:'56px',
                                color:'#E6E1E5'
                            }}
                        />

       </Box>

    </div>

    <Box
    sx={{
        display:'flex',
        justifycontent:'space-between',
        // border:'1px solid',
        
        width:'-3%',
        marginTop:'4%',
        marginLeft:'-60%'
    }}>
    {/* <CustomList items={listItems} handleToggle={handleCheckList} /> */}
                        <CustomList
                            items={listItems}
                            handleToggle={handleCheckList}
                            // showDescription={'hello'}
                            // maxWidth={800}
                            // showAvatar
                        />
                        {/* <CustomList items={listItems} handleToggle={handleCheckList} /> */}

              <Typography>
                Voice call Plan
              </Typography>
    </Box>
    <div className="Price-duration" style={{
        display:'flex',
        justifyContent:'space-between',

    }}>
       <Box
       sx={{
        // border:'1px solid',
        marginTop:'3%'
       }}>
       <CustomTextField
        label='Price'
        helperText={""}
        textcss={{
            width:'250px',
            height:'56px',
            flexShrink:'0',
            color:'#787579',
            fontfamily:'poppins',
            fontsize:'16px',
            fontstyle:'normal',
            fontweight:'400',
            lineHeight:'24px'
        }}>

        </CustomTextField>
       </Box>

       <Box
       sx={{
        //   border:'1px solid',
          width:'228px',
          marginLeft:'3%',
          marginTop:'3%'
       }}>
 <CustomDropdown
                            label={"Duration"}
                            items={dropdownItems}
                            activeItem={activeDropdown}
                            handleChange={(item) => setActiveDropdown(item)}
                            dropdowncss={{
                                width:'230px',
                                height:'56px',
                                color:'#E6E1E5'
                            }}
                        />

       </Box>

    </div>

    <Box
    sx={{
        display:'flex',
        justifycontent:'space-between',
        // border:'1px solid',
        
        width:'-3%',
        marginTop:'7%',
        marginLeft:'-60%'
    }}>
    {/* <CustomList items={listItems} handleToggle={handleCheckList} /> */}
                        <CustomList
                            items={listItems}
                            handleToggle={handleCheckList}
                            // showDescription={'hello'}
                            // maxWidth={800}
                            // showAvatar
                        />
                        {/* <CustomList items={listItems} handleToggle={handleCheckList} /> */}

              <Typography>
                Video call Plan
              </Typography>
    </Box>
    <div className="Price-duration" style={{
        display:'flex',
        justifyContent:'space-between',

    }}>
        <Box
        sx={{
            // border:'1px solid',
            marginTop:'2%'
        }}>
        <CustomTextField
        label='Price'
        helperText={""}
        textcss={{
            width:'250px',
            height:'56px',
            flexShrink:'0',
            color:'#787579',
            fontfamily:'poppins',
            fontsize:'16px',
            fontstyle:'normal',
            fontweight:'400',
            lineHeight:'24px'
        }}>

        </CustomTextField>
        </Box>
        

       <Box
       sx={{
        //   border:'1px solid',
          width:'228px',
          marginLeft:'3%',
          marginTop:'2%'
       }}>
 <CustomDropdown
                            label={"Duration"}
                            items={dropdownItems}
                            activeItem={activeDropdown}
                            handleChange={(item) => setActiveDropdown(item)}
                            dropdowncss={{
                                width:'230px',
                                height:'56px',
                                color:'#E6E1E5'
                            }}
                        />

       </Box>

    </div>
 <Box
 sx={{
    display:'flex',
    justifyContent:'center',
    // border:'1px solid',
    marginTop:'9%'
 }}>
 <CustomButton
 label='Save'
 buttonCss={{
    display:'flex',
    width:'170px',
    height:'48px',
    padding:'8px 16px',
    justifycontent:'center',
    alignItems:'center',
    gap:'8px',
    flexShrink:'0'

 }}>

 </CustomButton>

 </Box>
                            
                        </CustomModal>
                    </div>
                </div>
              </div>
<div className="Box1">
    <div className="detail-type">
        <Typography
        style={{
            fontFamily:'poppins',
            fontSize:'18px',
            fontstyle:'normal',
            fontweight:'400',
            lineheight:'28px',
            color:'#313033'

        }}>
            Messaging Plan
        </Typography>
        <Typography
        style={{
            fontFamily:'poppins',
            fontSize:'12px',
            fontstyle:'normal',
            fontweight:'400',
            lineheight:'18px',
            color:'#787579'
        }}>
            $12|30min & 60
        </Typography>
    </div>
    <div className="Delete-Edit">
        <div className="Delete-Icon">
            <Box
            sx={{
                // border:'1px solid',
                marginTop:'0.5rem',
                marginLeft:'5%'
            }}>
                <DeleteIcon/>
            </Box>
            <CustomButton
            label='Delete'
            isTransaprent={'True'}
            buttonCss={{
                borderBottom:'1px',
                            borderLeft:'1px',
                            borderRight:'1px',
                            borderTop:'1px',
            }}>
             
            </CustomButton>
        </div>
<div className="Edit-Icon">
    <Box
    sx={{
        // border:'1px solid',
        marginTop:'0.5rem',
        marginLeft:'5%'
    }}>
        <EditIcon/>
    </Box>
    <CustomButton
    label='Edit'
    isTransaprent={'True'}
    buttonCss={{
        borderBottom:'1px',
                            borderLeft:'1px',
                            borderRight:'1px',
                            borderTop:'1px',
    }}>

    </CustomButton>
</div>
    </div>
</div>
 
 <div className="Box2">
 <div className="detail-type1">
        <Typography
        style={{
            fontFamily:'poppins',
            fontSize:'18px',
            fontstyle:'normal',
            fontweight:'400',
            lineheight:'28px',
            color:'#313033'

        }}>
            Messaging Plan
        </Typography>
        <Typography
        style={{
            fontFamily:'poppins',
            fontSize:'12px',
            fontstyle:'normal',
            fontweight:'400',
            lineheight:'18px',
            color:'#787579'
        }}>
            $12|30min & 60
        </Typography>
    </div>
    <div className="Delete-Edit">
        <div className="Delete-Icon">
            <Box
            sx={{
                // border:'1px solid',
                marginTop:'0.5rem',
                marginLeft:'5%'
            }}>
                <DeleteIcon/>
            </Box>
            <CustomButton
            label='Delete'
            isTransaprent={'True'}
            buttonCss={{
                borderBottom:'1px',
                            borderLeft:'1px',
                            borderRight:'1px',
                            borderTop:'1px',
            }}>
             
            </CustomButton>
        </div>
<div className="Edit-Icon">
    <Box
    sx={{
        // border:'1px solid',
        marginTop:'0.5rem',
        marginLeft:'5%'
    }}>
        <EditIcon/>
    </Box>
    <CustomButton
    label='Edit'
    isTransaprent={'True'}
    buttonCss={{
        borderBottom:'1px',
                            borderLeft:'1px',
                            borderRight:'1px',
                            borderTop:'1px',
    }}>

    </CustomButton>
</div>
    </div>
 </div>

<div className="Box3">
<div className="detail-type2">
        <Typography
        style={{
            fontFamily:'poppins',
            fontSize:'18px',
            fontstyle:'normal',
            fontweight:'400',
            lineheight:'28px',
            color:'#313033'

        }}>
            Messaging Plan
        </Typography>
        <Typography
        style={{
            fontFamily:'poppins',
            fontSize:'12px',
            fontstyle:'normal',
            fontweight:'400',
            lineheight:'18px',
            color:'#787579'
        }}>
            $12|30min & 60
        </Typography>
    </div>
    <div className="Delete-Edit">
        <div className="Delete-Icon">
            <Box
            sx={{
                // border:'1px solid',
                marginTop:'0.5rem',
                marginLeft:'5%'
            }}>
                <DeleteIcon/>
            </Box>
            <CustomButton
            label='Delete'
            isTransaprent={'True'}
            buttonCss={{
                borderBottom:'1px',
                            borderLeft:'1px',
                            borderRight:'1px',
                            borderTop:'1px',
            }}>
             
            </CustomButton>
        </div>
<div className="Edit-Icon">
    <Box
    sx={{
        // border:'1px solid',
        marginTop:'0.5rem',
        marginLeft:'5%'
    }}>
        <EditIcon/>
    </Box>
    <CustomButton
    label='Edit'
    isTransaprent={'True'}
    buttonCss={{
        borderBottom:'1px',
                            borderLeft:'1px',
                            borderRight:'1px',
                            borderTop:'1px',
    }}>

    </CustomButton>
</div>
    </div>
</div>
 
            </div>
        </>
    );
};

export default EditAddPlans;
