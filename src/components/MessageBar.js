
<Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={this.state.snackBarOpen}
            autoHideDuration={2000}
            onClose={this.handleClose}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.message}</span>}
            action={[
                // <Button key="undo" color="secondary" size="small" onClick={this.handleCloseSnackBar}>
                // UNDO
                // </Button>,
                <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleCloseSnackBar}
                >
                <CloseIcon />
                </IconButton>,
            ]}
            />